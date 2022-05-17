export const formatPrice = (price: number) => {
    if (price) return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    return 0
}
