export const PRODUCT_TYPES = {
    NAME: 'name',
    PRICE: 'price',
    QUANTITY: 'quantity'
};

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
}

export const initialSortingState = {
    fields: [PRODUCT_TYPES.NAME, PRODUCT_TYPES.PRICE, PRODUCT_TYPES.QUANTITY],
    orders: [SORT_ORDER.ASC, SORT_ORDER.ASC, SORT_ORDER.ASC],
}