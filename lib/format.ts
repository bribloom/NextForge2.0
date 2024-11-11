export const formatPrice = (price: number) => {

    return new Intl.NumberFormat("en-PH", {

        style: "currency",
        currency: "PHP"

    }).format(price)

}