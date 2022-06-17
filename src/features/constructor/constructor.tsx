import React from "react"
import {useGetConstructor} from "../menu/menuSlice"
import EmptyPage from "components/empty-page/EmptyPage"
import ConstructorDetails from "./ConstructorDetails"

const Constructor = () => {
    const constructorGroup = useGetConstructor()

    // Пусто
    if (!constructorGroup)
        return <EmptyPage back="menu" />

    return <ConstructorDetails constructorGroup={constructorGroup} />
}

export default Constructor
