export default function filterShoes(shoesArray, gender, age, typeOfShoes, shoeSize) {
    // Set the valid age categories and map to shoe types in the schema
    let selected = ''
    if (gender === 'male' && age === 'kid') {
        selected = 'boy'
    } else if (gender === 'male' && age === 'adult') {
        selected = 'men'
    } else if (gender === 'female' && age === 'kid') {
        selected = 'girl'
    } else {
        selected = 'women'
    }

    // Define the size range: from `shoeSize` up to `shoeSize + 5`
    const minSize = shoeSize + 1;
    const maxSize = shoeSize + 5;

    // Filter the shoes
    const filterd = shoesArray.filter(shoe =>
        shoe.shoes_type === selected &&
        typeOfShoes.includes(shoe.type) &&
        shoe.shoe_Size >= minSize &&
        shoe.shoe_Size <= maxSize
    );
    return filterd

}