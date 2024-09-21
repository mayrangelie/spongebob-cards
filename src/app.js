document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.memory-card')

    let hasFlippedCard = false
    let lockBoard = false
    let firstCard, secondCard, matchCounter


    function flipCard() {
        if (lockBoard) return
        if (this === firstCard) return

        this.classList.add('flip')


        if (!hasFlippedCard) {
            hasFlippedCard = true
            firstCard = this
            return
        }

        secondCard = this
        lockBoard = true

        checkForMatch()
    }

    function checkForMatch() {
        // if (firstCard.dataset.framework === secondCard.dataset.framework) {
        //     disableCards()
        //     return
        // }

        // unflipCards()

        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
        
        if (isMatch) {
            matchCounter+=1
            disableCards()
            if (matchCounter == (cards.length/2)) {
                alert("Congratulations, you did it!")
            }
        }
        else {
            unflipCards()
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)

        resetBoard()
    }

    function unflipCards() {
            setTimeout(() => {
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip')

            resetBoard()
        }, 1200)
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false]
        [firstCard, secondCard] = [null, null]
    }

    (function shuffle() {
        cards.forEach(card => {
            let ramdomPos = Math.floor(Math.random() * 18)
            card.style.order = ramdomPos
        })
    })()

    cards.forEach(card => card.addEventListener('click', flipCard))

    document.querySelector('.restart-btn').addEventListener('click', function(){
        window.location.reload();
        return false;
      });
})
