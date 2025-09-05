const searchInput = document.querySelector(".form-control input");

const videoCards = document.getElementById("videoCards");

async function searchVideos(query) {
  try {
    
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${query}`);
    const data = await response.json();

    
    videoCards.innerHTML = "";

    
    if (!data.videos || data.videos.length === 0) {
      videoCards.innerHTML = `<p class="text-center text-red-500">No videos found for "${query}"</p>`;
      return;
    }

    
    data.videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "rounded-xl bg-[#0D0D0D]/60 backdrop-blur-md shadow-lg overflow-hidden";

      card.innerHTML = `
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
            <img src="${video.authors[0]?.profile_picture}" 
                 alt="Author" 
                 class="w-6 h-6 rounded-full p-[0.08rem] border-[0.08rem]" />
            <span class="text-white text-[14px] font-medium leading-[20px] font-[Inter]">
              ${video.authors[0]?.profile_name}
            </span>
            ${
              video.authors[0]?.verified
                ? `<svg xmlns="http://www.w3.org/2000/svg" 
                         class="w-4 h-4 text-green-500" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                     <circle cx="12" cy="12" r="10" />
                     <path d="M9 12l2 2 4-4" />
                   </svg>`
                : ""
            }
          </div>

          <!-- Meta Info -->
          <p class="font-[Inter] text-[14px] leading-[20px] font-bold text-[#36A30E]">
            ${video.others.views} views
          </p>

          <button onclick="videoDetails('${video.video_id}')" 
            class="btn btn-xs text-white font-semibold border-black shadow-none sm:btn-sm md:btn-md bg-[#070707a9]">
            Show Details
          </button>
        </div>
      `;

      videoCards.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    videoCards.innerHTML = `<p class="text-center text-red-500">Something went wrong. Try again.</p>`;
  }
}


searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();
    if (query) {
      searchVideos(query);
    }
  }
});
