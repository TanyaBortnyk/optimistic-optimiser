const SUPABASE_URL = 'ВСТАВТЕ_PROJECT_URL';
const SUPABASE_ANON_KEY = 'ВСТАВТЕ_ANON_АБО_PUBLISHABLE_КЛЮЧ';
const REDIRECT_AFTER_LOGIN = 'index.html';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
function translateError(error) {
    const message = (error && error.message ? error.message : '').toLowerCase();

    if (message.includes('invalid login credentials')) {
        return 'Невірний email або пароль';
    }
    if (message.includes('email not confirmed')) {
        return 'Підтвердіть email: ми надіслали вам лист із посиланням';
    }
    if (message.includes('user already registered')) {
        return 'Акаунт із таким email уже існує. Спробуйте увійти';
    }
    if (message.includes('password should be at least')) {
        return 'Пароль занадто короткий';
    }
    if (message.includes('unable to validate email') || message.includes('invalid format')) {
        return 'Некоректний формат email';
    }
    if (message.includes('rate limit') || message.includes('too many')) {
        return 'Забагато спроб. Зачекайте кілька хвилин і спробуйте знову';
    }
    if (message.includes('failed to fetch') || message.includes('network')) {
        return 'Немає з\'єднання із сервером. Перевірте інтернет';
    }

    return 'Щось пішло не так. Спробуйте ще раз';
}

function showAlert(element, text, type = 'error') {
    element.textContent = text;
    element.className = 'form-alert form-alert-' + type;
    element.hidden = false;
}

function hideAlert(element) {
    element.hidden = true;
    element.textContent = '';
}

function setLoading(button, isLoading, loadingText) {
    if (isLoading) {
        button.dataset.originalHtml = button.innerHTML;
        button.innerHTML = loadingText;
        button.disabled = true;
    } else {
        button.innerHTML = button.dataset.originalHtml || button.innerHTML;
        button.disabled = false;
    }
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
