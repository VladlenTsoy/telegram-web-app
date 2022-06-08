import React from "react"
import styles from "./MenuList.module.css"
import {useGetMenu} from "./menuSlice"
import cn from "classnames"
import PizzaList from "./pizza/PizzaList"
import HeaderMenu from "components/header-menu/HeaderMenu"
import LoadingBlock from "components/loading-block/LoadingBlock"
import {selectCategoryId, useApp} from "../app/appSlice"
import {useDispatch} from "store"

const ComboList = React.lazy(() => import("../combo/ComboList"))
const ProductList = React.lazy(() => import("./product/ProductList"))

const MenuList: React.FC = () => {
    const {categoryId} = useApp()
    const dispatch = useDispatch()
    const categories = useGetMenu()

    const onClickHandler = (categoryId: string) => {
        // Открыть приложение полностью
        if (window.Telegram && !window.Telegram.WebApp.isExpanded)
            window.Telegram.WebApp.expand()
        // Выбрать категорию
        dispatch(selectCategoryId(categoryId))
    }

    return <div className={styles.container}>
        <HeaderMenu categories={categories} selectCategoryId={categoryId} onClickHandler={onClickHandler} />
        <div className={cn(styles.content, {[styles.light]: window?.Telegram?.WebApp?.colorScheme === "light"})}>
            <React.Suspense fallback={<LoadingBlock />}>
                {categoryId === "4b328756-a3c4-4362-af84-9b029ee20c57" &&
                    <PizzaList />}
                {categoryId === "2a8e8de6-1e21-451d-ad46-56d2bfdd3db4" &&
                    <ProductList type="Drinks" scale="2" />}
                {categoryId === "8ba69bed-a233-4c0f-97d8-c380dbdb5a8f" &&
                    <ProductList type="Snack" />}
                {categoryId === "34b23388-aa3d-4a24-9820-892dc731b6eb" &&
                    <ProductList type="Salad" scale="2" />}
                {categoryId === "f5927e50-d95c-454f-bdb8-c1b6e335d066" &&
                    <ProductList type="Dessert" scale="1.8" />}
                {categoryId === "0e86aeb7-d000-4253-82b4-7982bd39bd59" &&
                    <ProductList type="Sauce" scale="1.1" />}
                {categoryId === "promotions" && <ComboList />}
            </React.Suspense>
        </div>
    </div>
}

export default MenuList
