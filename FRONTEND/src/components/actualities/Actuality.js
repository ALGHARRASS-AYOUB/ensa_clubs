import React, { useEffect, useState } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useActuality } from '../../context/ActualityContext'
import ActualityCard from './ActualityCard'

const Actuality = () => {

    // const [actualities,setActualities]=useState(null)
    const [newestActualities,setNewestActualities]=useState(null)
    var [currentPage,setCurrentPage]=useState()
    var [nextPage,setNextPage]=useState()
    var [prevPage,setPrevPage]=useState()
    var [pageNum,setPageNum]=useState()
    var [first,setFirst]=useState()
    var [last,setLast]=useState()
    var [links,setLinks]=useState([])
    var [foreLinks,setForeLinks]=useState([])
    var [meta,setMeta]=useState([])



    const {getAllActualities,getNewsetActualities,show,store,isLoading,setLoading}=useActuality()
    const navigate=useNavigate()


    const LoadingSpinner=()=>{
        return <>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>{' '}
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </>
    }

    


    async function fetchActualities(){
        
        const _newestActualities=await getNewsetActualities()
        setNewestActualities(_newestActualities.data.data)
        setForeLinks(_newestActualities.data.links)
        setMeta(_newestActualities.data.meta)
        setLinks(_newestActualities.data.meta.links)
        setFirst(foreLinks.next)
        setLast(foreLinks.last)
        setLoading(false)
    }

    useEffect(()=>{
       fetchActualities()
        // setActualities(getAllActualities())
        // setNewestActualities(getNewsetActualities())
    },[])
    
    // console.log('acutalitisi:  ',newestActualities)
    // console.log('currentPage:  ',currentPage)
    // console.log('nextPage:  ',nextPage)
    // console.log('prevPage:  ',prevPage)
    // console.log('pageNum:  ',pageNum)
    // console.log('first:  ',first)
    // console.log('last:  ',last)
    // console.log('foreLinks:  ',foreLinks)
    // console.log('meta:  ',meta)
    // console.log('isloading',isLoading)



return (<Container>
        {newestActualities!=null && newestActualities.map(item =>{return <div key={item.id} className='m-5 p-2'><ActualityCard title={item.title} body={item.body} image={item.image} startAt={item.startAt} endAt={item.endAt} /></div>})}
        </Container>)    


}

export default Actuality