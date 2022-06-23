// export const DOMAIN_API =
//     process.env.NODE_ENV === "production" ? "https://io.bellissimo.uz/api" : "https://devio.bellissimo.uz/api"

export const DOMAIN_API = "https://devio.bellissimo.uz/api"

export const request = async <T>(
    url: string,
    config: RequestInit = {}
): Promise<T> => {
    return fetch(url, config)
        .then(async (response) => {
            if (!response.ok) throw response
            return response.json()
        })
        .catch(async (e) => {
            const data = await e.json()
            if (e.status === 401)
                console.log("Ошибка токена!")
            // await message.error("Ошибка токена!")
            else if (e.status === 422) {
                // data.errors.map((error: any) => message.error(error.msg))
            } else {
                // message.error(data?.message || e?.message || "Неизвестная ошибка!")
            }
            throw Error(data?.message || e?.message || "Неизвестная ошибка!")
        })
        .then((data) => data as T)
}
