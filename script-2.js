//const URL = "http://localhost:8000/";
const URL = "https://polar-journey-71549.herokuapp.com/";

async function getSectionAPI() {
  try {
    const section = await fetch(URL + "sectionList");
    if (!section.ok) {
      throw new Error(`HTTP error: ${section.status}`);
    }
 

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
  var ul1='', ul2='', ul3='';
  var li;
  console.log(articleData)
  articleData.forEach(ar => {
    if (ar.sectionID == 1) {
      if (ar.hero == "true") {
        li = `<li>
       
                    <div class="hero-container">
                    <img src="${ar.imgLink}">
                    <a href=# >${ar.articleTitle}</a>
                    </div>
                    </li>`;
        ul1 += li;
      } else {
        li = `<li>
                    <a href=#>${ar.articleTitle}</a>
                    </li>`;
        ul1 += li;
      }
    } else if (ar.sectionID == 2) {
      if (ar.hero == "true") {
        li = `
                        <li>
                        <div class="hero-container">
                        <img src="${ar.imgLink}">
                        <a href=#>${ar.articleTitle}</a>
                        </div>
                        </li>
                        `;
        ul2 += li;
      } else {
        li = `
                        <li>
                        <a href=#>${ar.articleTitle}</a>
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
                    <a href=#>${ar.articleTitle}</a>
                    </div>
                    </li>
                    `;
        ul3 += li;
      } else {
        li = `
                    <li>
                    <a href=# >${ar.articleTitle}</a>
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
                    <li><img src="https://demo-kailaash-aus.s3.ap-southeast-2.amazonaws.com/ad-1.JPG"></li>
                    <li><img src="https://demo-kailaash-aus.s3.ap-southeast-2.amazonaws.com/ad-2.JPG"></li>
             </article>
         `;

  main.innerHTML = content;
}

// Live news Section

function parseLiveNews(data) {
  var ul='',i, iempty = `<i></i>`
for (let k of data) {
  if (k.hot == "true") {
    i = `<i class="fa fa-fire"></i>`
  }
   ul += ` <ul>
          <li>
          <a href=#>${k.newsContent}</a>
          ${k.hot == "true"? i:iempty}
           <img src=${k.imgLink} alt=${k.imgAlt}></img>
          </li>
          </ul>`
      }
      var aside = document.getElementById("aside");
      aside.innerHTML=ul;

}
