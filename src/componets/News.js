import { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
 
  const upDateNews = async () =>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    // console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }
  
useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - NewsAdda`;
 upDateNews()
//  eslint-disable-next-line
}, [])


 

// const handlePrevClick = async() =>{
//   setPage(page - 1)
//   upDateNews()
// }

// const handleNextClick = async() =>{
//   setPage(page + 1)
//   upDateNews()
// }
const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
};


    return (
      <>
        <h1 className='text-center' style={{margin:'30px 0px', marginTop: '90px'}}>NewsAdda - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

          <div className="row">
          {articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
            <NewsItem tittle={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
          </div>

        </div>
        </InfiniteScroll>
  
      </>
    )
  
}

News.defaultProps = {
  country: 'in',
  pagesize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}

export default News




// {
//     "status": "ok",
//     "totalResults": 2,
//     "articles": [
//     {
//     "source": {
//     "id": "espn-cric-info",
//     "name": "ESPN Cric Info"
//     },
//     "author": null,
//     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
//     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
//     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
//     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
//     "publishedAt": "2020-04-27T11:41:47Z",
//     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det??? [+1506 chars]"
//     },
//     {
//     "source": {
//     "id": "espn-cric-info",
//     "name": "ESPN Cric Info"
//     },
//     "author": null,
//     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
//     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
//     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
//     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
//     "publishedAt": "2020-03-30T15:26:05Z",
//     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried??? [+6823 chars]"
//     }
//     ]
//     }