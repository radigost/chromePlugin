const express = require('express')
const app = express()
var cors = require('cors')

const  axios= require('axios');

var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');

const gis = axios.create({
    baseURL:'https://catalog.api.2gis.ru/3.0'
  })
app.use(cors());


var typeDefs = [`
type Query {
  hello: String
}

schema {
  query: Query
}`];

var resolvers = {
  Query: {
    hello(root) {
      return 'world';
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/gis',async (req,res)=>{
    console.log(req.query);
    const params={
        viewpoint1:'37.26768463769532,55.80977031955012',
        viewpoint2:'37.93647736230469,55.69384154898953',
        page:'1',
        page_size:'12',
        q:req.query.hostname,
        region_id:'32',
        type:"street,adm_div.city,foreign_city,crossroad,route,branch,adm_div.settlement,station,gate,building,adm_div.district,road,adm_div.division,adm_div.living_area,attraction,adm_div.place,adm_div,parking",
        fields:"request_type,items.adm_div,items.attribute_groups,items.contact_groups,items.flags,items.address,items.rubrics,items.name_ex,items.point,items.geometry.centroid,items.region_id,items.external_content,items.org,items.group,items.schedule,items.ads.options,items.stat,items.reviews,items.purpose,search_type,context_rubrics,search_attributes,widgets,filters",
        key:'rutnpt3272'
    }
    try{
        const re = await gis.get('/items',{params});
        const result = re.data.result
        res.json({items:result.items});
    }catch(err){
        console.error(err);
    }
    
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))