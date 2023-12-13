<script>
	import { z } from "zod";

	const contactFormSchema = z.object({
		email: z.string().email("Please enter a valid email address"),
		name: z.string().min(1, "Please enter full name"),
		phone: z.string().min(5, "Please enter a valid phone number"), // Adjusted validation
		body: z.string() // Add any validations for the body if needed
	});

	let form = {
		email: "",
		name: "",
		phone: "",
		body: ""
	};

	let formErrors = {
		email: null,
		name: null,
		phone: null,
		body: null
	};

	let successMessage = "";
	let errorMessage = "";
	let isLoading = false;

	const handleSubmit = async (event) => {
		event.preventDefault();
		isLoading = true;
		successMessage = "";
		errorMessage = "";

		// Validate form
		const result = contactFormSchema.safeParse(form);
		if (!result.success) {
			formErrors = result.error.format(); // Format Zod errors
			isLoading = false;
			return;
		}

		try {
			// Form submission logic
			const formData = new FormData();
			formData.append("email", form.email);
			formData.append("name", form.name);
			formData.append("phone", form.phone);
			formData.append("body", form.body);

			const response = await fetch("/api/sendEmail", {
				method: "POST",
				body: formData
			});

			if (response.status === 200) {
				successMessage = "Email sent successfully";
				form = { email: "", name: "", phone: "", body: "" };
			} else {
				errorMessage = "Error sending email";
			}
		} catch (error) {
			console.error(error);
			errorMessage = "Internal server error";
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="contactFormInner rounded-sm isolate">
	<div class="">
		<h2 class="small-title text-primary-700">Get in touch.</h2>
		<form on:submit={handleSubmit} class="flex flex-col space-y-6">
			<input required type="text" name="name" bind:value={form.name} placeholder="Name" />
			{#if formErrors.name}<span class="error">{formErrors.name}</span>{/if}

			<input
				required
				type="email"
				name="email"
				bind:value={form.email}
				placeholder="email@xyz.com" />
			{#if formErrors.email}<span class="error">{formErrors.email}</span>{/if}

			<input
				required
				type="tel"
				name="phone"
				bind:value={form.phone}
				placeholder="(123) 345-6789" />
			{#if formErrors.phone}<span class="error">{formErrors.phone}</span>{/if}

			<textarea
				required
				id="textarea-id"
				placeholder="Your message"
				rows="4"
				name="body"
				bind:value={form.body} />
			{#if formErrors.body}<span class="error">{formErrors.body}</span>{/if}
			<small>
				Nulla facilisi. Sed vitae magna sed purus fringilla ornare. Nullam non molestie sem, quis
				consectetur nunc. Proin massa quam, fringilla interdum tempor et, sodales ut mi.
			</small>
			<button
				type="submit"
				class="tBtn2  tBtn2Alt mt-6 relative items-center gap-2"
				id="submitButton"
				disabled={isLoading}>
				{#if isLoading}
					<div class="loader"></div>
					Submitting...
				{:else}
					Submit
				{/if}
			</button>

			{#if successMessage}
				<p class="success">{successMessage}</p>
			{/if}
			{#if errorMessage}
				<p class="error">{errorMessage}</p>
			{/if}
		</form>
	</div>
</div>

<style>
	.error {
		color: red;
	}
	.success {
		color: green;
	}
	.loader {
		border: 2px solid var(--myBlue);
		border-radius: 50%;
		border-top: 2px solid #ffffff; /* Change the color as needed */
		width: 20px;
		height: 20px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
