import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

function AQITable() {  
  return(   
    <>  
      <TableContainer component={Paper} style={{ padding: '0 0.25rem', border: '1px solid #ddd' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>AQI</TableCell>
              <TableCell>Air Pollution Level</TableCell>
              <TableCell>Health Implications</TableCell>
              <TableCell>Cautionary Statement (for PM2.5)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{ backgroundColor: 'green' }}>
              <TableCell nowrap="true" style={{ color: 'white' }}>0 - 50</TableCell>
              <TableCell style={{ color: 'white' }}>Good</TableCell>
              <TableCell style={{ color: 'white' }}>Air quality is considered satisfactory, and air pollution poses little or no risk</TableCell>
              <TableCell style={{ color: 'white' }}>None</TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: 'yellow' }}>
              <TableCell nowrap="true">51 - 100</TableCell>
              <TableCell>Moderate</TableCell>
              <TableCell>Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.</TableCell>
              <TableCell>Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.</TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: 'orange' }}>
              <TableCell nowrap="true">101-150</TableCell>
              <TableCell>Unhealthy for Sensitive Groups</TableCell>
              <TableCell>Members of sensitive groups may experience health effects. The general public is not likely to be affected.</TableCell>
              <TableCell>Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.</TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: 'red' }}>
              <TableCell nowrap="true" style={{ color: 'white' }}>151-200</TableCell>
              <TableCell style={{ color: 'white' }}>Unhealthy</TableCell>
              <TableCell style={{ color: 'white' }}>Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects</TableCell>
              <TableCell style={{ color: 'white' }}>Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion</TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: 'purple' }}>
              <TableCell nowrap="true" style={{ color: 'white' }}>201-300</TableCell>
              <TableCell style={{ color: 'white' }}>Very Unhealthy</TableCell>
              <TableCell style={{ color: 'white' }}>Health warnings of emergency conditions. The entire population is more likely to be affected.</TableCell>
              <TableCell style={{ color: 'white' }}>Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.</TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: 'maroon' }}>
              <TableCell nowrap="true" style={{ color: 'white' }}>300+</TableCell>
              <TableCell style={{ color: 'white' }}>Hazardous</TableCell>
              <TableCell style={{ color: 'white' }}>Health alert: everyone may experience more serious health effects</TableCell>
              <TableCell style={{ color: 'white' }}>Everyone should avoid all outdoor exertion</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <span>
        Source: 
        <Link href="https://aqicn.org/scale/">aqicn.org</Link>
      </span>
    </>
  )
}

export default AQITable