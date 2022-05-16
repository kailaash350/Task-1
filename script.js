//const URL = "http://localhost:8000/";
const URL = "https://polar-journey-71549.herokuapp.com/";

async function getSectionAPI() {
  try {
    const section = await fetch(URL + "sectionList");
    if (!section.ok) {
      throw new Error(`HTTP error: ${section.status}`);
    }
    const sectionList = await section.json();

    const liveNews = await fetch(URL + "liveNews");
    if (!liveNews.ok) {
      throw new Error(`HTTP error: ${liveNews.status}`);
    }
    const liveNewsList = await liveNews.json();

    parseLiveNews(liveNewsList.liveNews);
    createSection(sectionList.sectionList);
  } catch (error) {
    console.error(`Server error : ${error}`);
  }
}

// This functions calls the api based on passed arg

async function callForArticle(param) {
  try {
    const articles = await fetch(URL + param);
    if (!articles.ok) {
      throw new Error(`HTTP error: ${articles.status}`);
    }
    const response = await articles.json();
    const resp = response.articleList;
    return resp;
  } catch (error) {
    console.log("Server Error")
  }
}


// Recevies section data and calls subsequent articles listed in it.

function createSection(sectionList) {
  sectionList.forEach(sl => {
   callForArticle(sl.sectionURL)
      .then(resp => buildArticleSection(resp))
        .then(data => {
          buildSection(sl, data)
      })

  });

}


// builds the main content 

function buildSection(sec, ar) {
  var content = '', main = document.getElementById("main");
  var seeMore = `<li>
                <a href="#" class="anchor-button">See More</a>
                </li>`;

  content += `
             
             <h3>${sec.sectionName}</h3>
                  ${ar}
                 ${seeMore}
            `;

  const article = document.createElement('article');
  article.innerHTML = content;
  main.appendChild(article);
}

// builds the small article sections

function buildArticleSection(data) {
  let li = '', ul = '';
  data.forEach(ar => {
if(ar.articleTitle != "Advertisment"){
    if (ar.hero == "true") {
      li = `<li>
     
                  <div class="hero-container">
                  <img src="${ar.imgLink}">
                  <a href=# >${ar.articleTitle}</a>
                  </div>
                  </li>`;
      ul += li;
    }
    else {
      li = `<li>
                    <a href=#>${ar.articleTitle}</a>
                    </li>`;
      ul += li;
    }
  }else{
        li=`<li class="ads"><img src=${ar.imgLink}></li>`;
        ul+=li;
  }
  });

  return ul;

}




// Live news Section

function parseLiveNews(data) {
  var ul = '', i, iempty = `<i></i>`
  data.forEach(k => {

    if (k.hot == "true") {
      i = `<i class="fa fa-fire"></i>`
    }
    ul += ` <ul>
            <li>
            <a href=#>${k.newsContent}</a>
            ${k.hot == "true" ? i : iempty}
             <img src=${k.imgLink} alt=${k.imgAlt}></img>
            </li>
            </ul>`

  });
  var aside = document.getElementById("aside");
  aside.innerHTML = ul;

}
