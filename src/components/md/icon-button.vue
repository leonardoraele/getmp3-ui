<template>
	<div :class="{ 'mdc-touch-target-wrapper': touch }">
		<button
			ref="mdc-target"
			@click="() => this.$emit('click')"
			:class="['mdc-icon-button', 'material-icons', { 'mdc-icon-button--touch': touch }]"
		>
			<div class="mdc-icon-button__ripple"></div>
			<slot/>
    		<div v-if="touch" class="mdc-icon-button__touch"></div>
		</button>
	</div>
</template>

<script>
import {MDCRipple} from '@material/ripple';
import MDCControl from 'getmp3-ui/components/md/mixins/mdc-control';

export default
{
	mixins: [MDCControl(MDCRipple)],
	emits: ['click'],
	props:
	{
		touch: { type: Boolean, default: false },
		// toggle: { type: Boolean, required: false, default: null },
	},
}
</script>

<style lang="sass">
@use "~@material/icon-button/mdc-icon-button";
</style>
