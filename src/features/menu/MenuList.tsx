import React from "react"
import styles from "./MenuList.module.css"
import {useGetMenu} from "./menuSlice"
import {Link} from "react-router-dom"

const obj: {[key: string]: string} = {
    "4b328756-a3c4-4362-af84-9b029ee20c57": "🍕",
    "2a8e8de6-1e21-451d-ad46-56d2bfdd3db4": "🥤",
    "8ba69bed-a233-4c0f-97d8-c380dbdb5a8f": "🍟",
    "34b23388-aa3d-4a24-9820-892dc731b6eb": "🥗",
    "f5927e50-d95c-454f-bdb8-c1b6e335d066": "🍰",
    "0e86aeb7-d000-4253-82b4-7982bd39bd59": "⚪️"
}

const MenuList: React.FC = () => {
    const categories = useGetMenu()
    return <div className={styles.container}>
        <h1>Меню</h1>
        <div className={styles.list}>
            {
                categories.map(category =>
                    <Link to="/pizza-list" className={styles.card} key={category.id}>
                        <span className={styles.icon}>{obj[category.id]}</span>{category.name}
                    </Link>
                )
            }
        </div>
    </div>
}

export default MenuList
