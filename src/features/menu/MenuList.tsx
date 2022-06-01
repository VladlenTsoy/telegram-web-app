import React, {useEffect, useState} from "react"
import styles from "./MenuList.module.css"
import {useGetMenu} from "./menuSlice"
import cn from "classnames"
import PizzaList from "./pizza/PizzaList"
import ProductList from "./product/ProductList"
import {useLanguage} from "../../utils/i18n.config"

const obj: {[key: string]: string} = {
    "4b328756-a3c4-4362-af84-9b029ee20c57": "🍕",
    "2a8e8de6-1e21-451d-ad46-56d2bfdd3db4": "🥤",
    "8ba69bed-a233-4c0f-97d8-c380dbdb5a8f": "🍟",
    "34b23388-aa3d-4a24-9820-892dc731b6eb": "🥗",
    "f5927e50-d95c-454f-bdb8-c1b6e335d066": "🍰",
    "0e86aeb7-d000-4253-82b4-7982bd39bd59": "😋"
}

const MenuList: React.FC = () => {
    const categories = useGetMenu()
    const {lang} = useLanguage()
    const [selectCategoryId, setSelectCategoryId] = useState<string>()

    const onClickHandler = (categoryId: string) => {
        // Открыть приложение полностью
        if (window.Telegram && !window.Telegram.WebApp.isExpanded)
            window.Telegram.WebApp.expand()
        // Выбрать категорию
        setSelectCategoryId(categoryId)
    }

    useEffect(() => {
        if (categories.length) {
            setSelectCategoryId(categories[0].id)
        }
    }, [categories])


    return <div className={styles.container}>
        <div className={styles.list}>
            {
                categories.map(category =>
                    <div
                        key={category.id}
                        className={cn(styles.card, {[styles.active]: category.id === selectCategoryId})}
                        onClick={() => onClickHandler(category.id)}
                    >
                        <span className={styles.icon}>{obj[category.id]}</span>
                        <div className={styles.title}>{category.translations.title[lang] || category.name}</div>
                    </div>
                )
            }
        </div>
        <div className={cn(styles.content, {[styles.light]: window?.Telegram?.WebApp?.colorScheme === "light"})}>
            {selectCategoryId === "4b328756-a3c4-4362-af84-9b029ee20c57" && <PizzaList />}
            {selectCategoryId === "2a8e8de6-1e21-451d-ad46-56d2bfdd3db4" && <ProductList type="Drinks" scale="2" />}
            {selectCategoryId === "8ba69bed-a233-4c0f-97d8-c380dbdb5a8f" && <ProductList type="Snack" />}
            {selectCategoryId === "34b23388-aa3d-4a24-9820-892dc731b6eb" && <ProductList type="Salad" scale="2" />}
            {selectCategoryId === "f5927e50-d95c-454f-bdb8-c1b6e335d066" && <ProductList type="Dessert" scale="1.8" />}
            {selectCategoryId === "0e86aeb7-d000-4253-82b4-7982bd39bd59" && <ProductList type="Sauce" scale="1.1" />}
        </div>
    </div>
}

export default MenuList
