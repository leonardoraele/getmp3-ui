<template>
	<div class="flex-column justify-center align-items-center fill-content">
		<h1 class="app-title">{{APP_NAME.toUpperCase()}}</h1>
		<div class="height-1" />
		<MdTextField
			v-model:value="userInput"
			label="YouTube video URL or SoundCloud music URL"
			class="width-40"
			ref="userInputField"
			@click="() => this.$refs.userInputField.element.select()"
		/>
		<div class="height-1" />
		<div v-if="this.errorMessage">{{this.errorMessage}}</div>
		<div v-else-if="this.downloadUrl" class="flex-row width-40">
			<MdTextField
				ref="downloadField"
				@click="() => this.$refs.downloadField.element.select()"
				class="fill-width"
				:value="this.downloadUrl"
				label="Your download link"
				filled readonly
			/>
			<MdIconButton @click="this.copy">content_copy</MdIconButton>
			<MdIconButton @click="this.open">open_in_new</MdIconButton>
		</div>
	</div>
</template>

<script>
import MdTextField from 'getmp3-ui/components/md/textfield';
import MdIconButton from 'getmp3-ui/components/md/icon-button';
import trimEnd from 'lodash/trimEnd';

export default {
	data: () => (
	{
		userInput: '',
		error: null,
	}),
	computed:
	{
		APP_NAME: () => BUILD_ARGS.APP_NAME,
		errorMessage()
		{
			if (!this.userInput?.length)
			{
				return null;
			}
			try
			{
				new URL(this.userInput);
				return null;
			}
			catch(error)
			{
				return error.message;
			}
		},
		downloadUrl()
		{
			if (!this.userInput.length)
			{
				return null;
			}

			const apiBaseUrl = trimEnd(BUILD_ARGS.API_URL, '/');
			const userInputUrl = encodeURI(this.userInput);
			return `${apiBaseUrl}/download?url=${userInputUrl}`;
		},
	},
	watch:
	{
		downloadUrl(url)
		{
			if (url !== null)
			{
				this.error = null;
			}
		},
	},
	methods:
	{
		async copy()
		{
			await window.navigator.clipboard.writeText(this.downloadUrl);
		},
		open()
		{
			window.open(this.downloadUrl);
		},
	},
	components: { MdTextField, MdIconButton },
};
</script>

<style>
.app-title {
	font-family: sans-serif;
	font-weight: bold;
}
</style>
