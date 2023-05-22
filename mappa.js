
function estraiTotale(colonna){
  return riferimenti.reduce((obj, riferimento) => ({
    ...obj,
    [riferimento]: data
      .filter(d => d.country_id === riferimento)
      .reduce((somma, riga) => somma + riga[colonna], 0)
  }), {})
}

function calcoloWi(TotalePesoClasse){
  return riferimenti.reduce((obj, riferimento) => ({
    ...obj,
    [riferimento]: data
      .filter(d => d.country_id === riferimento)
      .reduce((somma,riga)=>({...somma,
      [riga.classe_eta]: riga.peso_classe / TotalePesoClasse[riga.country_id] }),{}) 
  }), {})
}

function divTassoStandard(rif,riga){
  return  (
    rif[riga.classe_eta] * (
      riga.popolazione === 0 ? 0 : riga.casi/riga.popolazione
      )
    ) / rif[riga.classe_eta];
}

function tassoStandard(wi,k = 1000){
  return riferimenti.reduce((obj, riferimento) => ({
    ...obj,
    [riferimento]: data
      .filter(d => d.country_id === riferimento)
      .reduce((somma,riga)=>({...somma,
      ["tasso"]:k === 1000 ?  
        (divTassoStandard(wi[riferimento],riga)*k).toFixed(2)    
      : divTassoStandard(wi[riferimento],riga)*k }),{}) 
  }), {})
}

function tassoGrezzo(casi,popolazione,k = 1000){
  return riferimenti.reduce((obj, riferimento) => ({
    ...obj,
    [riferimento]: data
      .filter(d => d.country_id === riferimento)
      .reduce((somma,riga)=>({...somma,
      ["tasso"]:k === 1000 ?  
        ((casi[riferimento]/popolazione[riferimento]) *k).toFixed(2)    
      : (casi[riferimento]/popolazione[riferimento])*k }),{}) 
  }), {})
}
