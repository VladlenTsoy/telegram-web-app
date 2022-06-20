import React, {useEffect, useState} from "react"
import styles from "./Promocode.module.css"
import Button from "components/button/Button"
import {useDispatch} from "store"
import {cancelPromoCode, useGetPromoCode} from "../promoCodeSlice"
import {useCartTotalPrice} from "../../cartSlice"
import {checkPromoCode} from "../checkPromoCode"
import {getCookie} from "../../../../utils/cookie"
import {useTranslation} from "react-i18next"

const Promocode = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const promoCode = useGetPromoCode()
    const [coupon, setCoupon] = useState("")
    const totalPrice = useCartTotalPrice()

    const onChangeHandler = (val: any) => {
        setCoupon(val)
    }

    const onSubmitHandler = async (e: any) => {
        e.preventDefault()
        const phone = getCookie("phone") || "+998903192933"
        const token = getCookie("token")
        const name = window.Telegram.WebApp.initDataUnsafe.user?.first_name || ""
        document.body.innerText = JSON.stringify({coupon, token, phone, name})
        if (coupon !== "" && phone) await dispatch(checkPromoCode({coupon, token, phone, name}))
    }

    const onCancelHandler = () => {
        dispatch(cancelPromoCode())
    }

    useEffect(() => {
        if (promoCode.name && promoCode.error.message) {
            dispatch(cancelPromoCode())
        }
    }, [dispatch, promoCode])

    useEffect(() => {
        if (promoCode.error.code && promoCode.error.code === "ErrorPromoCodeAuth") {
            // window.scrollTo(0, 0)
            // setTimeout(() => dispatch(openAuthModal()), 100)
        }
    }, [promoCode.error.code])

    useEffect(() => {
        if (promoCode.name === "epam" && totalPrice > 0) {
            const phone = getCookie("phone") || "+998903192933"
            const token = getCookie("token")
            const name = window.Telegram.WebApp.initDataUnsafe.user?.first_name || ""
            const promise = dispatch(checkPromoCode({
                coupon: promoCode.name,
                name,
                phone,
                token
            }))
            return () => {
                promise.abort()
            }
        }
    }, [promoCode.name, totalPrice])

    return (
        <div className={styles.promocode}>
            <label htmlFor="">Промокод</label>
            <form className={styles.container} onSubmit={onSubmitHandler}>
                <div className={styles.wrapperInput}>
                    <input
                        placeholder={t("promo")}
                        onChange={(e) => onChangeHandler(e.target.value)}
                    />
                </div>
                <div className={styles.wrapperButton}>
                    {promoCode.name ?
                        <Button
                            htmlType="button"
                            type="danger"
                            onClick={onCancelHandler}
                        >
                            {}
                        </Button> :
                        <Button
                            htmlType="submit"
                            type="secondary"
                            disabled={promoCode.loading}
                        >
                            {promoCode.loading ? t("sendLoading") : t("apply")}
                        </Button>
                    }
                </div>
            </form>
            {promoCode.error.code && <div className={styles.message}>{t(promoCode.error.code)}</div>}
            {promoCode.error.message && <div className={styles.message}>{promoCode.error.message}</div>}
        </div>
    )
}

export default Promocode
