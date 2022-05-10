const URL = "https://polar-journey-71549.herokuapp.com/";

async function getSectionAPI() {
  try {
    const section = await fetch(URL + "sectionList");
    if (!section.ok) {
      throw new Error(`HTTP error: ${section.status}`);
    }
    //   const sectionList = await section.json();

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
    createArticle(articleList.articleList);
  } catch (error) {
    console.error(`Server error : ${error}`);
  }
}

function createArticle(articleData) {
  var ul1, ul2, ul3, ul4;
  var li;
  articleData.forEach(ar => {
    if (ar.sectionID == 1) {
      if (ar.hero == "true") {
        li = `<li>
       
                    <div class="hero-container">
                    <img src="${ar.imgLink}">
                    <a href=#  target="_blank">${ar.articleTitle}</a>
                    </div>
                    </li>`;
        ul1 += li;
      } else {
        li = `<li>
                    <a href=#  target="_blank">${ar.articleTitle}</a>
                    </li>`;
        ul1 += li;
      }
    } else if (ar.sectionID == 2) {
      if (ar.hero == "true") {
        li = `
                        <li>
                        <div class="hero-container">
                        <img src="${ar.imgLink}">
                        <a href=# target="_blank">${ar.articleTitle}</a>
                        </div>
                        </li>
                        `;
        ul2 += li;
      } else {
        li = `
                        <li>
                        <a href=#  target="_blank">${ar.articleTitle}</a>
                        </li>
                        `;
        ul2 += li;
      }
    } else if (ar.sectionID == 3) {
      if (ar.hero == "true") {
        li = `
                    <li>
                    <div class="hero-container">
                    <img src="${ar.imgLink}">
                    <a href=# target="_blank">${ar.articleTitle}</a>
                    </div>
                    </li>
                    `;
        ul3 += li;
      } else {
        li = `
                    <li>
                    <a href=#  target="_blank">${ar.articleTitle}</a>
                    </li>
                    `;
        ul3 += li;
      }
    } 
  });

  var content = "";
  var main = document.getElementById("main");
  var seeMore = `<li>
<a href="#" target="_blank" class="anchor-button">See More</a>
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
                    <li><img src="./images/ad-1.JPG"></li>
                    <li><img src="./images/ad-2.JPG" alt=""></li>
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
