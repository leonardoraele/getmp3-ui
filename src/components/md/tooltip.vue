<template>
	<div ref="mdc-target" :id="id" class="mdc-tooltip" role="tooltip" aria-hidden="true">
		<div class="mdc-tooltip__surface mdc-tooltip__surface-animation">
			<slot/>
		</div>
	</div>
</template>

<script>
import MDCControl from 'getmp3-ui/components/md/mixins/mdc-control';
import {MDCTooltip} from '@material/tooltip';

export default
{
	mixins: [MDCControl(MDCTooltip)],
	props:
	{
		id: String,
	},
}
</script>

<style lang="sass">
@use "~@material/tooltip/styles";
</style>
