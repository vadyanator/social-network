export const updateObjectInArray = (items, itemId, objPropName, newOdjProps) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return { ...u, ...newOdjProps }
        }
        return u
    })
}