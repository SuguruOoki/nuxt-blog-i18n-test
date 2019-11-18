<template>
  <header>
    <div class="header__info">
      <div class="container header__info-container">
        <div class="header__navi">
          About
        </div>
        <div class="header__navi">
          Intro
        </div>
        <div class="header__navi">
          Service
        </div>
        <div class="header__navi">
          Columns
        </div>
        <div class="header__navi">
          Recruit
        </div>
        <div class="header__navi">
          Contact
        </div>
        <div class="header__navi">
          ご家族の方へ<br />
          写真観覧はこちら
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
}
</script>

<style lang="scss">
.header {
	&__info {
		background-color: $background-primary;
		padding: 1.5em 0;
  }
  
  &__info-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;

    @media (min-width: $screen-sm){
      flex-direction: row;
    }
  }

	&__copyright {
		text-align: center;
		@media (min-width: $screen-sm) {
			text-align: inherit;
		}
	}

	&__top-page {
		color: $text-negative;
		display: block;
		text-align: center;
		line-height: 1;
		-webkit-transition: 1s;
		-moz-transition: 1s;
    transition: 1s;
    
		@media (min-width: $screen-sm){
			text-align: right;
		}
	}
}
</style>

