export const isInvalid = (newRecipe) => {
    const reqFields = [
        "recipeName",
        "category",
        "ingredients",
        "instructions",
        "servingSuggestion",
        "recipeTime"
    ]

    const isInvalid = reqFields.some(
        (field) => !newRecipe[field]
    )

    
    return (isInvalid ? true : false)
}