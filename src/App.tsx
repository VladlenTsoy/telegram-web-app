import React from "react"
import styles from "./App.module.css"
import MenuList from "./features/menu/MenuList"

function App() {
    return (
        <div className={styles.app}>
            <MenuList />
            {/*<Loader />*/}
        </div>
    )
}

export default App
