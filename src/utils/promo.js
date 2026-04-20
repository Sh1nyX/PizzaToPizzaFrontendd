export function getPromo() {
    return JSON.parse(
        localStorage.getItem('activePromo')
    )
}

export function getDiscountedPrice(price, pizzaId) {

    const promo = getPromo()

    if (!promo) return price

    const universal =
        !promo.pizzaId ||
        promo.pizzaName === 'Універсальний'

    const samePizza =
        promo.pizzaId === pizzaId

    if (universal || samePizza) {
        return Math.round(
            price -
            price * promo.discountPercent / 100
        )
    }

    return price
}