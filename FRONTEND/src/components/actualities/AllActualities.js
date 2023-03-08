import React, { useEffect, useState } from 'react'
import { Button, Container,Row,Col,Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useActuality } from '../../context/ActualityContext'
import ActualityCard from './ActualityCard'

const AllActualities = () => {
    const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)

    const [filtredData, setFiltredData] = useState([]);
    const [filter,setFilter]=useState('all')
    const [actualities,setActualities]=useState(null)
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
        
        const _actualities=await getAllActualities()
        setActualities(_actualities?.data.data)
        setFiltredData(_actualities?.data.data)

        setForeLinks(_actualities?.data.links)
        setMeta(_actualities?.data.meta)
        setLinks(_actualities?.data.meta.links)
        setFirst(foreLinks?.next)
        setLast(foreLinks?.last)
        setLoading(false)
    }


    const updateTable = (v = null, searchKey = null) => {
        if (v != null && searchKey == null) {
            setFilter(searchKey)
          setFiltredData(actualities)
        }
        if(searchKey != null && v == null){
          const data = actualities.filter(item => {
            return item.title.toLowerCase().search(searchKey.toLowerCase()) != -1 || item.evenement.name.toLowerCase().search(searchKey.toLowerCase()) != -1;
          });
          console.log(data);
          setFiltredData(data);
        }
      };


    useEffect(()=>{
       fetchActualities()
       if (userInfo != null) {
        setUserInfo(JSON.parse(localStorage.getItem('userinfo')).data);
      } else {
        return navigate('/login');
      }
    },[localStorage.getItem('userinfo'),filter])
    
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
   
      <Row className='m-4'>

        <Col md='6'>
          <Form.Control
            placeholder='Search Actuality'
            aria-label='Search Actuality'
            aria-describedby='basic-addon2'
            onChange={(e)=>updateTable(null,e.target.value)}
          />
        </Col>
      </Row>
      <Row>
      <Container className='mx-4 my-2'>
      <Button className='mx-2 my-1' variant="info" size="md" href='/admin/actualities/createActuality'>
            <span>add new actuality</span><i className='mx-3 fa fa-plus-square '></i>
        </Button>
        
        <Button className='mx-2 my-1' variant="info" title='check events' size="md" href='/admin/events'>
            <span>add new actuality for local event</span><i className='mx-3 fa fa-plus-square '></i>
        </Button>
      
        </Container>  
      </Row>

        {actualities!=null && filtredData.map(item =>{return <div key={item.id} className='m-5 p-2'><ActualityCard actuality={item} /></div>})}
        </Container>)    


}

export default AllActualities