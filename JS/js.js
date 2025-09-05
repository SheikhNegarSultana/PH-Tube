function categoryButton(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then( data =>  categoriesFunction(data.categories))


    function categoriesFunction(categories){
        const buttons = document.getElementById('buttons')
        for( const category of categories){
            // console.log(category.category)
            const button = document.createElement('button')
            button.className = "px-3 py-1.5 sm:px-4 sm:py-2 cursor-pointer rounded-full bg-[rgba(9,8,8,0.38)] text-gray-200 font-semibold text-xs sm:text-sm hover:bg-[rgba(255,255,255,0.12)] hover:text-black transition-colors duration-200"

button.addEventListener("click", () => {
    
// remove 
  document.querySelectorAll("#buttons button").forEach(btn => {
    btn.classList.remove("active")
  })

  // Active 
  button.classList.add("active")

  
  fetchVideosByCategory(category.category_id),videosFunction(data.category || [])


})

            button.innerHTML = `<button>${category.category}</button>`

            
            buttons.appendChild(button)
        }
    }
}
categoryButton()




// Video API

function videoAPIFetchAndDesign(){
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => {
      videosFunction(data.videos)
      
      if (data.videos.length > 0) {
        fetchByVideoId(data.videos[0].video_id)
      }
    })


const allBtn = document.getElementById("allBtn")

allBtn.addEventListener("click", () => {
  
  document.querySelectorAll("#buttons button, #allBtn").forEach(btn => {
    btn.classList.remove("active")
  })

  allBtn.classList.add("active")
})


}
videoAPIFetchAndDesign()

function videosFunction(videos){
        const videoCards = document.getElementById('videoCards')
        videoCards.innerHTML = "" 

        if(videos.length === 0){
        const div = document.createElement("div")
        div.className = "col-span-full text-center py-10"
        div.innerHTML = `
            <h2 class="text-2xl font-bold text-red-500 mb-2">Oops!</h2>
            <p class="text-gray-300">No videos available in this category.</p>
        `
        videoCards.appendChild(div)
        return
        }

        for(const video of videos){
            console.log(video)

            const div = document.createElement('div')
            div.className = 'bg-[#1E21284D] rounded-[32px] border border-[#FFFFFF1A] shadow-[0px_0px_1px_#171a1f0d,0px_0px_2px_#171a1f14] overflow-hidden flex flex-col'



            div.innerHTML = `

<!-- Image -->
  <div class="relative w-full h-[192px]">
    <img src="${video.thumbnail}" 
         alt="Thumbnail"
         class="w-full h-full object-cover" />
  </div>

  <!-- Content -->
  <div class="flex flex-col gap-3 px-4 py-3">
    <!-- Title -->
    <p class="font-[Outfit] text-[18px] leading-[28px] font-bold text-[#F3F4F6]">
      ${video.title}
    </p>

    <!-- Author -->
    <div class="flex items-center gap-2">
      <img src="${video.authors.map(a=>a.profile_picture)}" alt="Author" class="w-6 h-6 rounded-full p-[0.08rem] border-[0.08rem]" />
      <span class="text-white text-[14px] font-medium leading-[20px] font-[Inter]">
        ${video.authors.map(a=>a.profile_name)}
      </span>
    ${video.authors.map(a => a.verified ?       
    `<svg xmlns="http://www.w3.org/2000/svg" 
             class="w-4 h-4 text-green-500" 
             fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
         <circle cx="12" cy="12" r="10" />
         <path d="M9 12l2 2 4-4" />
       </svg>`
    : "")}
    </div>

    <!-- Meta Info -->
    <p class="font-[Inter] text-[14px] leading-[20px] font-bold text-[#36A30E]">
      ${video.others.views} views
    </p>

<button onclick="videoDetails('${video.video_id}')" 
  class="btn btn-xs text-white font-semibold border-black shadow-none sm:btn-sm md:btn-md bg-[#070707a9]">
  Show Details
</button>
  </div>`

            videoCards.appendChild(div)
        }
    }


function fetchVideosByCategory(id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
      videosFunction(data.category) 
    })
}

function videoDetails(id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then(res => res.json())
    .then(data => {
      const video = data.video
      if (!video) return

     
      document.getElementById("modalTitle").innerText = video.title
      document.getElementById("modalDescription").innerText = video.description || "No description available."
      document.getElementById("modalThumbnail").src = video.thumbnail

      
      document.getElementById("videoModal").classList.remove("hidden")
    })
}

function closeModal() {
  document.getElementById("videoModal").classList.add("hidden")
}

