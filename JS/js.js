function categoryButton(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then( data =>  categoriesFunction(data.categories))


    function categoriesFunction(categories){
        const buttons = document.getElementById('buttons')
        for( const category of categories){
            console.log(category.category)
            const button = document.createElement('button')
            button.innerHTML = `<button class="px-3 py-1.5 sm:px-4 sm:py-2 cursor-pointer rounded-full bg-[rgba(9,8,8,0.38)] text-gray-200 font-semibold text-xs sm:text-sm hover:bg-[rgba(255,255,255,0.12)] hover:text-black transition-colors duration-200">${category.category}</button>`
            buttons.appendChild(button)
        }
    }
}
categoryButton()
