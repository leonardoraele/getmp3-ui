<template>
	<div :class="{ 'mdc-touch-target-wrapper': touch }">
		<button
			ref="mdc-target"
			@click="() => this.$emit('click')"
			:class="
			[
				'mdc-button',
				{
					'mdc-button--raised': raised,
					'mdc-button--unelevated': contained && !raised,
					'mdc-button--touch': touch,
					'mdc-button--outlined': outlined && !(raised || contained),
				}
			]"
		>
			<span v-if="ripple" class="mdc-button__ripple"></span>
			<span v-if="touch" class="mdc-button__touch"></span>
			<span class="mdc-button__label">
				<slot/>
			</span>
		</button>
	</div>
</template>

<script>
import {MDCRipple} from '@material/ripple';
import MDCControl from 'getmp3-ui/components/md/mixins/mdc-control';

export default
{
	mixins:
	[
		MDCControl(MDCRipple),
	],
	emits: ['click'],
	props:
	{
		outlined:
		{
			type: Boolean,
			default: false,
		},
		touch:
		{
			type: Boolean,
			default: true,
		},
		ripple:
		{
			type: Boolean,
			default: true,
		},
		contained:
		{
			type: Boolean,
			default: false,
		},
		raised:
		{
			type: Boolean,
			default: false,
		},
	},
	mounted()
	{
		if (!this.ripple)
		{
			this.destroyMDC();
		}
	},
	watch:
	{
		ripple(enabled)
		{
			enabled
				? this.setupMDC()
				: this.destroyMDC();
		},
	},
};
</script>

<style lang="scss">
@use "~@material/button/styles";
</style>
