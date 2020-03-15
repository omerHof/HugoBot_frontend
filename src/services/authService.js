import cookies from 'js-cookie';

export function register(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    })
}

export function login(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = {email, password};
            cookies.set('auth-token', 'my token');
            resolve(user);
        }, 500);
    })
}