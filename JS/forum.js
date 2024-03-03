async function getData(url) {
  try {
    const res = await fetch(url);
    const datas = await res.json();
    console.log(datas);
    // return data;
    displayDatas(datas);
  } catch (e) {
    console.error(e.message);
  }
}

function displayDatas(datas) {
  console.log(datas);
  const latestPostSection = document.getElementById("latest-posts");
  datas.forEach((data) => {
    console.log(data);
    const div = document.createElement("div");
    div.classList =
      "card p-5 bg-base-100 rounded-2xl border border-[#12132d26] flex flex-col";
    div.innerHTML = `
    <figure class="">
        <img src=${data?.cover_image} alt=${data?.title}
            class="rounded-2xl" />
    </figure>
    <div class="flex-grow space-y-3 mt-5">
        <div class="text-natural flex gap-2 items-center">
            <i class="fa-regular fa-calendar-days"></i>
            <p>${
              data?.author?.posted_date
                ? data.author.posted_date
                : "No publish date"
            }</p>
        </div>
       <div class="flex flex-col space-y-3">
       <h5 class="text-lg font-extrabold font-mulish leading-normal text-title">${
         data?.title
       }</h5>
           <p class="flex-grow font-mulish">${data?.description}</p>
        </div>
    </div>
      <div class="flex gap-4 items-center mt-3">
        <img src=${data?.profile_image} alt=${
      data?.author?.name
    } class="size-12 object-cover rounded-full">
            <div>
                <h6 class="font-bold">${data?.author?.name}</h6>
                <p class="text-sm font-mulish">${
                  data?.author?.designation
                    ? data?.author?.designation
                    : "Unknown"
                }</p>
            </div>
        </div>
      `;
    latestPostSection.appendChild(div);
  });
}

// const latestPosts = getData(
//     "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
//   );
//   console.log(latestPosts);
getData("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
