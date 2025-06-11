import os
import requests
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv
from supabase import create_client, Client
from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes,
    ConversationHandler
)

# Carica variabili da file .env
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_SERVICE_ROLE = os.getenv("SUPABASE_SERVICE_ROLE")
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")

if not all([SUPABASE_URL, SUPABASE_KEY, SUPABASE_SERVICE_ROLE, TELEGRAM_TOKEN]):
    raise EnvironmentError("❌ Variabili .env mancanti. Controlla SUPABASE_URL, SUPABASE_KEY, SUPABASE_SERVICE_ROLE, TELEGRAM_TOKEN.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

NAME, BRAND, DOSE, TIME, CYCLE, DURATION, START_DATE, REASON = range(8)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    keyboard = [["💊 Farmaco", "🍀 Supplemento"]]
    reply_markup = ReplyKeyboardMarkup(keyboard, one_time_keyboard=True, resize_keyboard=True)
    await update.message.reply_text("Ciao! Vuoi inserire un supplemento o un farmaco?", reply_markup=reply_markup)
    return 1000

async def get_name(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['name'] = update.message.text.strip().lower().title()
    if context.user_data.get('mode') == 'drug':
        await update.message.reply_text("Perché lo assumi?")
        return REASON
    else:
        await update.message.reply_text("Brand?")
        return BRAND

async def get_reason(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['reason'] = update.message.text.strip().capitalize()
    await update.message.reply_text("Dose (es. 400mg)?")
    return DOSE

async def get_brand(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['brand'] = update.message.text.strip().lower().title()
    await update.message.reply_text("Dose (es. 400mg)?")
    return DOSE

async def get_dose(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['dose'] = update.message.text.strip().lower()
    return await ask_start_date(update)

async def ask_start_date(update: Update) -> int:
    keyboard = [["📅 Oggi", "📅 Ieri"]]
    reply_markup = ReplyKeyboardMarkup(keyboard, one_time_keyboard=True, resize_keyboard=True)
    await update.message.reply_text("Quando hai iniziato a prenderlo? (Formato: YYYY-MM-DD)", reply_markup=reply_markup)
    return START_DATE

async def get_start_date(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    text = update.message.text.strip()
    if text == "📅 Oggi":
        start_date = datetime.today().date()
    elif text == "📅 Ieri":
        start_date = datetime.today().date() - timedelta(days=1)
    else:
        try:
            start_date = datetime.strptime(text, "%Y-%m-%d").date()
        except ValueError:
            await update.message.reply_text("❌ Formato non valido. Scrivi la data in formato YYYY-MM-DD oppure scegli un'opzione.")
            return START_DATE

    context.user_data['start_date'] = start_date.isoformat()
    keyboard = [["1 settimana", "2 settimane"], ["1 mese", "2 mesi"], ["3 mesi", "Continuo"]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True, one_time_keyboard=True)
    await update.message.reply_text("Per quanto tempo lo assumi?", reply_markup=reply_markup)
    return DURATION

async def get_duration(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['duration'] = update.message.text.strip()
    duration = context.user_data['duration'].lower()
    start_date = datetime.strptime(context.user_data['start_date'], "%Y-%m-%d").date()
    duration_map = {
        "1 settimana": 7,
        "2 settimane": 14,
        "1 mese": 30,
        "2 mesi": 60,
        "3 mesi": 90,
    }
    end_date = start_date + timedelta(days=duration_map.get(duration, 0)) if duration in duration_map else None
    context.user_data['end_date'] = end_date.isoformat() if end_date else None

    keyboard = [["📆 Tutti i giorni"], ["🔁 Giorni alterni"]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True, one_time_keyboard=True)
    await update.message.reply_text("Hai un ciclo?", reply_markup=reply_markup)
    return CYCLE

async def get_cycle(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['cycle'] = update.message.text.strip().lower()
    keyboard = [["☀️ Mattina"], ["🍽️ Pranzo"], ["🌙 Sera"], ["✅ Fatto"]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    await update.message.reply_text("Quando lo assumi? (puoi selezionare più orari, premi ✅ Fatto quando hai finito)", reply_markup=reply_markup)
    context.user_data['time_choices'] = []
    return TIME

async def get_time(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    text = update.message.text.strip()
    if text == "✅ Fatto":
        selected_times = context.user_data.get('time_choices', [])
        if not selected_times:
            await update.message.reply_text("⚠️ Nessun orario selezionato. Riprova.")
            return TIME
        context.user_data['time'] = ', '.join(selected_times)
        return await save_data(update, context)
    else:
        context.user_data.setdefault('time_choices', []).append(text)
        await update.message.reply_text("✅ Aggiunto! Seleziona un altro momento oppure premi ✅ Fatto.")
        return TIME

async def save_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    telegram_id = str(update.effective_user.id)
    email = f"telegram_{telegram_id}@bot.local"

    try:
        user_response = supabase.table("users").select("id").eq("telegram_id", telegram_id).execute()
        if user_response.data:
            user_id = user_response.data[0]['id']
        else:
            admin_headers = {
                "apikey": SUPABASE_SERVICE_ROLE,
                "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE}",
                "Content-Type": "application/json"
            }
            payload = {"email": email, "password": "temporaryPass123", "email_confirm": True}
            auth_url = f"{SUPABASE_URL}/auth/v1/admin/users"
            auth_res = requests.post(auth_url, headers=admin_headers, data=json.dumps(payload))
            auth_data = auth_res.json()

            if 'id' in auth_data:
                user_id = auth_data['id']
            else:
                users_res = requests.get(f"{SUPABASE_URL}/auth/v1/admin/users", headers=admin_headers)
                users = users_res.json().get('users', [])
                user_id = next((u.get("id") for u in users if u.get("email") == email), None)
                if not user_id:
                    raise ValueError("❌ User ID non trovato nemmeno via admin/users")

            supabase.table("users").insert({"id": user_id, "telegram_id": telegram_id}).execute()

        data = {
            "user_id": user_id,
            "name": context.user_data['name'],
            "dose": context.user_data['dose'],
            "time": context.user_data.get('time'),
            "cycle": context.user_data['cycle'],
            "duration": context.user_data.get('duration'),
            "start_date": context.user_data.get('start_date'),
            "end_date": context.user_data.get('end_date')
        }

        if context.user_data.get('mode') == 'supplement':
            data['brand'] = context.user_data.get('brand')
        if context.user_data.get('mode') == 'drug':
            data['reason'] = context.user_data.get('reason')

        table = "drugs" if context.user_data.get('mode') == 'drug' else "supplements"
        supabase.table(table).insert(data).execute()
        await update.message.reply_text("✅ Dato salvato! Vuoi aggiungerne un altro? /start oppure /stop")

    except Exception as e:
        await update.message.reply_text("❌ Errore durante il salvataggio.")
        import traceback
        traceback.print_exc()

    return ConversationHandler.END

async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text("Operazione annullata.")
    return ConversationHandler.END

async def route_entry(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    choice = update.message.text.strip().lower()
    if 'farmac' in choice:
        context.user_data['mode'] = 'drug'
        await update.message.reply_text("Nome del farmaco?")
    else:
        context.user_data['mode'] = 'supplement'
        await update.message.reply_text("Nome del supplemento?")
    return NAME

def main() -> None:
    print("🤖 Avvio bot...")
    application = Application.builder().token(TELEGRAM_TOKEN).build()

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            1000: [MessageHandler(filters.TEXT & ~filters.COMMAND, route_entry)],
            NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_name)],
            REASON: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_reason)],
            BRAND: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_brand)],
            DOSE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_dose)],
            START_DATE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_start_date)],
            DURATION: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_duration)],
            CYCLE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_cycle)],
            TIME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_time)],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )

    application.add_handler(conv_handler)
    application.run_polling()

if __name__ == "__main__":
    main()
