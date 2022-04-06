<ButtonToolbar aria-label="Toolbar with button groups">
<div class="col d-grid justify-content-md-center">
  {isGameSelected || isAISelected ? (
    <Button id="restart" onClick={handleRestart}>
      Restart
    </Button>
  ) : (
    <ButtonGroup className="mb-2" aria-label="First group">
      <Button id="AIvAI" onClick={handleAIvsAI}>
        Watch AI Play
      </Button>
      <Button id="playAI" onClick={handlePlayAI}>
        Player vs AI
      </Button>
      <Button id="playOnline">Play Online</Button>
      <Button onClick={openChangeTimeoutHandler}>Change Timeout</Button>
      {
        props.showchangeTimeoutPopup &&
        <ChangeTimeout
          modalClosed={props.changeTimeoutToggleHandler} />
      }
    </ButtonGroup>
  )}
</div>
</ButtonToolbar>