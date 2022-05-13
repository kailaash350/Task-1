const URL = "http://localhost:8000/";
//const URL = "https://polar-journey-71549.herokuapp.com/";

async function getSectionAPI() {
  try {
    const section = await fetch(URL + "sectionList");
    if (!section.ok) {
      throw new Error(`HTTP error: ${section.status}`);
    }
    const sectionList = await section.json();

    const article = await fetch(URL + "articleList");
    if (!article.ok) {
      throw new Error(`HTTP error: ${article.status}`);
    }
    const articleList = await article.json();

    const liveNews = await fetch(URL + "liveNews");
    if (!liveNews.ok) {
      throw new Error(`HTTP error: ${liveNews.status}`);
    }
    const liveNewsList = await liveNews.json();

    parseLiveNews(liveNewsList.liveNews);
    createArticle(articleList.articleList, sectionList.sectionList);
  } catch (error) {
    console.error(`Server error : ${error}`);
  }
}

function createArticle(articleData, sectionList) {
    console.log(articleData)

    var content = "";
    var main = document.getElementById("main");
    var seeMore = `<li>
  <a href="#" class="anchor-button">See More</a>
  </li>`;
  
    content += `
               <article>
               <h3>Fashion</h3>
                    ${ul1}
                   ${seeMore}
                  
               </article>
               <article>
                   <h3>Travel</h3>
  
                    ${ul2}
                   ${seeMore} 
                  
               </article>
               <article>
                   <h3>Beauty</h3>
  
                    ${ul3}
                   ${seeMore}
                  
               </article>
               <article>
               <h3>Advertisment</h3>
               <ul class="cards">
                      <li><img src="https://demo-kailaash-aus.s3.ap-southeast-2.amazonaws.com/ad-1.JPG"></li>
                      <li><img src="https://demo-kailaash-aus.s3.ap-southeast-2.amazonaws.com/ad-2.JPG"></li>
                  </ul>
               </article>
           `;
  
    main.innerHTML = content;
}

// Live news Section

function parseLiveNews(data) {
  let ul = document.createElement("ul");
  for (let k of data) {
    let i;
    if (k.hot == "true") {
      i = document.createElement("i");
      i.setAttribute("class", "fa fa-fire");
    }
    let iempty = document.createElement("i");
    let img = document.createElement("img");
    img.src = k.imgLink;
    let a = document.createElement("a");
    a.innerHTML = k.newsContent;
    let li = document.createElement("li");
    li.appendChild(a);
    k.hot == "true" ? li.appendChild(i) : li.appendChild(iempty);
    li.appendChild(img);
    ul.appendChild(li);
  }

  var aside = document.getElementById("aside");
  aside.appendChild(ul);
}
