<template>
	<div :class="{ inline }">
		<label
			ref="mdc-target"
			:class="
			[
				'mdc-text-field',
				'fill-width',
				{
					'mdc-text-field--filled': filled,
					'mdc-text-field--outlined': !filled,
					'mdc-text-field--textarea': textarea,
					'mdc-text-field--no-label': !label,
					'mdc-text-field--disabled': disabled,
					'mdc-text-field--label-floating': !!value.length,
					'mdc-text-field--end-aligned': endaligned,
				}
			]"
		>
			<span v-if="!filled" class="mdc-notched-outline">
				<span class="mdc-notched-outline__leading"></span>
				<span v-if="label" class="mdc-notched-outline__notch">
					<span
						:class="['mdc-floating-label', {'mdc-floating-label--float-above': !!value.length}]"
					>
						{{label}}
					</span>
				</span>
				<span class="mdc-notched-outline__trailing"></span>
			</span>
			<span v-if="ripple" class="mdc-text-field__ripple" />
			<span
				v-if="label && filled"
				:class="['mdc-floating-label', {'mdc-floating-label--float-above': !!value.length}]"
			>
				{{label}}
			</span>
			<span v-if="prefix" class="mdc-text-field__affix mdc-text-field__affix--prefix">{{prefix}}</span>
			<input
				v-if="!textarea"
				:value="value"
				@input="e => this.$emit('update:value', e.target.value)"
				class="mdc-text-field__input"
				type="text"
				:disabled="disabled"
				:maxlength="maxlength ?? false"
				:required="required"
				:invalid="validate && !validate(value)"
			/>
			<span v-if="suffix" class="mdc-text-field__affix mdc-text-field__affix--suffix">{{suffix}}</span>
			<span v-if="textarea" :class="{ 'mdc-text-field__resizer': resizeable }">
				<textarea
					:value="value"
					@input="e => this.$emit('update:value', e.target.value)"
					class="mdc-text-field__input"
					:rows="rows"
					:cols="cols"
					:maxlength="maxlength ?? false"
					:required="required"
					:invalid="validate && !validate(value)"
				/>
				<span
					v-if="maxlength && counterInside"
					class="mdc-text-field-character-counter"
				>
					{{value.length}} / {{maxlength}}
				</span>
			</span>
			<span v-if="ripple" class="mdc-line-ripple" />
		</label>
		<div v-if="maxlength || helperText" class="mdc-text-field-helper-line">
			<div v-if="helperText" class="mdc-text-field-helper-text" aria-hidden="true">{{helperText}}</div>
			<div v-if="maxlength && (!textarea || !counterInside)" class="mdc-text-field-character-counter">{{value.length}} / {{maxlength}}</div>
		</div>
	</div>
</template>

<script>
import {MDCTextField} from '@material/textfield';
import MDCControl from 'getmp3-ui/components/md/mixins/mdc-control';

export default
{
	mixins: [MDCControl(MDCTextField)],
	emits: ['update:value'],
	props:
	{
		value: { type: String, required: false, default: '' },
		label: { type: String, required: false },
		filled: { type: Boolean, default: false },
		ripple: { type: Boolean, default: true },
		textarea: { type: Boolean, default: false },
		rows: { type: Number, default: 8 },
		cols: { type: Number, default: 40 },
		resizeable: { type: Boolean, default: true },
		disabled: { type: Boolean, default: false },
		helperText: { type: String, required: false },
		maxlength: { type: Number, required: false },
		counterInside: { type: Boolean, default: false },
		prefix: { type: String, required: false },
		suffix: { type: String, required: false },
		required: { type: Boolean, default: false },
		validate: { type: Function, required: false },
		inline: { type: Boolean, default: false },
		endaligned: { type: Boolean, default: false },
	},
	computed:
	{
		console: () => console,
	},
};
</script>

<style lang="scss">
@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";

@include textfield.core-styles;

div.inline {
	display: inline;
}

.fill-width {
	width: 100%;
}
</style>
