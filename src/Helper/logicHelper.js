export const getLastMessageHelper = (data, setLast) => {
    if (!data || !Array.isArray(data)) return;
    let last = data[0];
    data.forEach(chat => {
        if (chat.time > last.time) last = chat;
    })
    setLast(last);
}

export const onChangeFnHelper = (e, setData) => {
    setData(e.target.value)
}