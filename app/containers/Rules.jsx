import React, {Component} from 'react'

class Rules extends Component {
    render() {
        return (
            <div>
                <h2>Regler</h2>
                <hr />
                <div>Vanlig kast i kopp = 1 kopp </div> <hr />
                <div>Kast med sprett = 2 kopper, motstander har da lov til å slå ballen vekk </div> <hr />
                <div>'Sprett er sprett', så vegg, tak, gulv osv er 2 kopper. >2 sprett gir fortsatt 2 kopper </div> <hr />
                <div>Hvis flere kopper går tapt ved bruk av dobbelkopp-givende-treff, skal en av nabokoppene til treffkoppen gå tapt - hvilken kopp velger det forsvarende lag </div> <hr />
                <div>Riktignok, sprett innenfor koppenes trekant og sprett via kopp til kopp, er ikke lik sprett for dobbelkopp </div> <hr />
                <div>To baller i samme kopp = èn bonuskopp går tapt (Eksempel: Person 1 spretter i kopp tilsvarende 2 kopper. Person 2 hiver ball i samme kopp tilsvarende 1 kopp. 3 kopper går tapt + èn bonuskopp for å treffe i samme. Totalt 4 kopper </div> <hr />
                <div>Begynner ballen og spinne i koppen, er det lov til å blåse ballen ut igjen. Har ballen kontakt med væsken, gjelds det som treff </div> <hr />
                <div>Kommer ballen tilbake på bordet blir det et ekstra kast backhand </div> <hr />
                <div>backhandtreff gir 1 kopp </div> <hr />
                <div>Man kan kun kaste ballen når man står bak tapet linje </div> <hr />
                <div>Selvmål er selvmål - èn kopp går tapt </div> <hr />
                <div>Velter du en eller flere av dine egne kopper, går disse tapt. Fyll opp, drikk og ta de vekk </div> <hr />
                <div>Begge lag får 2 kast (èn til hver person). Disse må bli kastet før det er neste lags tur </div> <hr />
                <div>Ved en urettmessig bortslåing av ball uten sprett, blir dette straffet med nytt vanlig kast + en backhand </div> <hr />
                <div>En rotering av kopper per match </div> <hr />
                <div>Hvert lag får utdelt 10 kopper hver som de må passe på selv </div> <hr />
                <div>Ved uavgjort blir det 'flip the cup' konkurranse </div> <hr />
                <div>I gruppespill varer kampene 15 min. I sluttspill 25 min. Finalen varer helt ut </div>
            </div>
        )
    }
}

export default Rules
