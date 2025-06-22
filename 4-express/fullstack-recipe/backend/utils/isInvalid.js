export const isInvalid = (newRecipe) => {

    //yeni tarif oluştururken body'den gelmesi gereken değerler
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