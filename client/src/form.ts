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
    const link = path.split('/');
    const formName = link[link.length - 1];

    submitInfo(`/forms/${formName}`, userData)
        .then(data => {
            if(data.status === 200){
                return window.location.href = data.url;
            }

            return data.json();
        })
        .then(res => {
            if(res.message) {
                alert(res.message);
            }
        }) 
        .catch(err => console.error(`An issue ocurred: ${err}`))
}
