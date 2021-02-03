const submitInfo = async (url: string, data: object) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response;
};

const form = document.querySelector('form');
form?.addEventListener('submit', (e: Event): void => {
    e.preventDefault();
    
    let userInfo: { [key: string]: string | number } = {};
    const allValues = [...form.querySelectorAll('input')];
    
    for(let prop in allValues) {
        userInfo[allValues[prop].name] = allValues[prop].value;
    }

    formPath(document.URL, userInfo);
});

const formPath = (path: String, userData: object) => {
    if(path.includes('register.html')) {
        submitInfo('/forms/register.html', userData)
            .then(data => console.log(data))
            .catch(err => console.error(`An issue ocurred: ${err}`))
    } else if(path.includes('log-in.html')) {
        submitInfo('/forms/log-in.html', userData)
            .then(data => console.log(data))
            .catch(err => console.error(`An issue ocurred: ${err}`))
    }
}
