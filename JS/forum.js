let makeAsRead = 0;
const bookMarks = [];
const searchField = document.getElementById("search-field");
const btnSearch = document.getElementById("btn-search");
const postsContainer = document.getElementById("post-container");

function toogleLoadingSpinner(isLoading) {
  const loadingSpinner = document.getElementById("loading-spinner");
  // console.log(loadingSpinner);
  if (isLoading) {
    // console.log(loadingSpinner);
    loadingSpinner?.classList.remove("hidden");
    loadingSpinner?.classList.add("flex", "justify-center", "items-center");
  } else {
    // console.log(loadingSpinner);
    loadingSpinner?.classList.remove("flex", "justify-center", "items-center");
    loadingSpinner?.classList.add("hidden");
  }
}

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  const searchItem = searchField.value;
  if (!searchItem) {
    alert("Input field is empty!");
    return;
  }
  postsContainer.innerHTML = "";

  getPosts(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchItem}`
  );
  // console.log(searchItem);
  searchField.value = "";
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function getPosts(url) {
  toogleLoadingSpinner(true);
  try {
    const res = await fetch(url);
    const posts = await res.json();
    // console.log(posts);
    // setTimeout(() => {
    //   displayPosts(posts.posts);
    // }, 1000);
    displayPosts(posts.posts);
  } catch (e) {
    console.error(e.message);
  }
}

function displayPosts(posts) {
  // console.log(posts);
  posts.forEach((post) => {
    // const makeAsReadTotla = document.getElementById("make-as-read-total");
    // const makeAsReadContainer = document.getElementById(
    //   "make-as-read-container"
    // );
    // console.log(post);
    // let sendtoBookmark = {
    //   id: post?.id,
    //   title: post?.title,
    //   views: post?.view_count,
    // };
    // sendtoBookmark = JSON.stringify(sendtoBookmark);
    // console.log(sendtoBookmark);
    const div = document.createElement("div");
    div.classList =
      "flex gap-4 md:gap-6 p-6 md:p-8 lg:p-10 rounded-3xl bg-[#F3F3F5] hover:bg-[#797dfc1a] border border-transparent hover:border-primary delay-100 mb-6";
    div.innerHTML = `
                        <div class="">
                            <div class="relative">
                                <img class="size-16 lg:size-[72px] rounded-xl object-cover cursor-pointer" src=${
                                  post?.image
                                } alt=${post?.author?.name}>
                                <span class="absolute top-0.5 left-10 md:left-12 lg:left-14 transform -translate-y-1/2 size-2.5 md:size-3.5 rounded-full ${
                                  post?.isActive
                                    ? "bg-[#10B981]"
                                    : "bg-[#FF3434]"
                                }"></span>
                            </div>
                        </div>
                        <div class="flex flex-col w-full">
                            <div class="flex gap-4 *:text-dark-gray *:text-sm *:font-inter *:font-medium items-center">
                                <p># ${post?.category}</p>
                                <p>Author : ${post?.author?.name}</p>
                            </div>
                            <div class="flex-grow border-b border-dashed border-natural pb-5">
                                <h4 class="text-lg font-bold text-title leading-normal mt-3 mb-4">${
                                  post?.title
                                }</h4>
                                <p>${post?.description}</p>
                            </div>
                            <div class="flex justify-between items-center mt-3 md:mt-5">
                                <div class="flex gap-3 md:gap-6 *:flex *:items-center *:gap-1 *:md:gap-2">
                                    <div class="*:md:text-lg">
                                        <i class="fa-regular fa-comment-dots text-natural"></i>
                                        <p>${post?.comment_count}</p>
                                    </div>
                                    <div class="*:md:text-lg">
                                        <i class="fa-regular fa-eye text-natural"></i>
                                        <p>${post?.view_count}</p>
                                    </div>
                                    <div class="*:md:text-lg">
                                        <i class="fa-regular fa-clock text-natural"></i>
                                        <p>${post?.posted_time} min</p>
                                    </div>
                                </div>
                                <div class="tooltip tooltip-bottom" data-tip="Mark as read">
                                <img 
                                 onclick="addToMakeAsRead('${post?.title.replace(
                                   "'",
                                   ""
                                 )}', '${post?.view_count}','${post?.id}')"
                                 src="./images/email 1.svg" alt="" class="size-6 md:size-7 cursor-pointer">
                                </div>
                            </div>
                        </div>
                    </div>  
    
      `;
    postsContainer.appendChild(div);
  });
  toogleLoadingSpinner(false);
}

getPosts("https://openapi.programming-hero.com/api/retro-forum/posts");

function addToMakeAsRead(title, views, id) {
  // function addToMakeAsRead(bookMarkPostStr) {
  //   console.log(bookMarkPostStr);
  //   const bookMarkPost = JSON.parse(bookMarkPostStr);
  //   console.log(bookMarkPost);
  // const { id, title, views } = bookMarkPost;
  // console.log(id);
  const isPostExist = bookMarks.find((bookMark) => bookMark.id === id);
  // console.log(isPostExist);
  if (isPostExist) {
    alert("Post has already been added!");
    return;
  }
  const newBookMark = { id, title, views };
  bookMarks.push(newBookMark);
  // console.log(newBookMark);
  // console.log(bookMarks);

  // title.replace("", "")

  //   console.log(post);
  //   title = "10 Kids Unaware of Their Halloween Costume";
  //   views = 5600;
  // title.replace("'","")
  // console.log(title);
  // console.log(views);
  const makeAsReadTotlal = document.getElementById("make-as-read-total");
  const makeAsReadContainer = document.getElementById("make-as-read-conatiner");
  const div = document.createElement("div");
  div.classList =
    "bg-white p-4 rounded-xl flex justify-between items-start gap-2";
  div.innerHTML = `
<h4 class="md:text-lg text-title font-semibold md:font-bold leading-normal font-mulish">${title}</h4>
<div class="flex items-center gap-2 *:md:text-lg">
    <i class="fa-regular fa-eye text-natural"></i>
    <p>${views}</p>
</div>
`;
  makeAsReadContainer.appendChild(div);
  makeAsRead++;
  makeAsReadTotlal.textContent = makeAsRead;
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
async function getLatestPosts(url) {
  try {
    // const res = await fetch(
    //   "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    // );
    const res = await fetch(url);
    const datas = await res.json();
    // console.log(datas);
    // return data;
    displayLatestPosts(datas);
  } catch (e) {
    console.error(e.message);
  }
}

function displayLatestPosts(datas) {
  //   console.log(datas);
  const latestPostSection = document.getElementById("latest-posts");
  datas.forEach((data) => {
    // console.log(data);
    const div = document.createElement("div");
    div.classList =
      "card p-5 bg-base-100 rounded-2xl border border-[#12132d26] flex flex-col";
    div.innerHTML = `
    <figure class="">
        <img src=${data?.cover_image} alt="${data?.title}"
            class="rounded-2xl cursor-pointer" />
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
    } class="size-12 object-cover rounded-full cursor-pointer">
            <div>
                <h6 class="font-bold cursor-pointer">${data?.author?.name}</h6>
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

// const latestPosts = getLatestPosts(
//     "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
//   );
//   console.log(latestPosts);
getLatestPosts(
  "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
);
