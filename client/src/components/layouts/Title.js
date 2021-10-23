import React from 'react'

const getStyles = () => ({
    title:{
        fontSize: 50,
        padding: '15px',
        marginBottom: '50px'
    }
})
 const Title =() => {
    const styles = getStyles();
    return <h1 styles={styles.title}>Its all about who you know!!</h1>
}
export default Title;