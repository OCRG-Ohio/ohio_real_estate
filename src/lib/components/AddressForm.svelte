<script>
    import { z } from 'zod';
    import { Card, Input, Button, Select } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let step = 1;
    let form = {
        address: '',
        name: '',
        email: '',
        phoneNumber: '',
        timeFrame: ''
    };

    let formErrors = {
        address: null,
        name: null,
        email: null,
        phoneNumber: null,
        timeFrame: null
    };

    const addressSchema = z.object({
        address: z.string().min(1, 'Address is required')
    });

    const detailsSchema = z.object({
        name: z.string().min(1, 'Full name is required'),
        email: z.string().email('Please enter a valid email address'),
        phoneNumber: z.string().min(1, 'Phone number is required'),
        timeFrame: z.string()
    });

    let isLoading = false;
    let errorMessage = '';

    const handleContinue = async () => {
        const result = addressSchema.safeParse({ address: form.address });
        if (!result.success) {
            formErrors = result.error.format();
            return;
        }

        step = 2;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        isLoading = true;
        errorMessage = '';

        const result = detailsSchema.safeParse(form);

        if (!result.success) {
            formErrors = result.error.format();
            isLoading = false;
            return;
        }

        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));

            const response = await fetch("/api/sendEmail", {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                dispatch('formSubmitted'); // Notify parent component
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message || "Error sending email";
            }
        } catch (error) {
            console.error(error);
            errorMessage = "Internal server error";
        } finally {
            isLoading = false;
        }
    };
</script>

<Card class="mt-6 rounded-sm isolate w-[460px]" padding="xl">
    {#if step === 1}
        <form class="flex flex-col space-y-6">
            <Input required type="text" bind:value={form.address} placeholder="Address"/>
            {#if formErrors.address}<span class="error">{formErrors.address}</span>{/if}
            <Button on:click={handleContinue}>Continue</Button>
        </form>
    {:else if step === 2}
        <form on:submit={handleSubmit} class="flex flex-col space-y-6">
            <Input required type="text" bind:value={form.name} placeholder="Full Name"/>
            {#if formErrors.name}<span class="error">{formErrors.name}</span>{/if}

            <Input required type="email" bind:value={form.email} placeholder="Email Address"/>
            {#if formErrors.email}<span class="error">{formErrors.email}</span>{/if}

            <Input required type="tel" bind:value={form.phoneNumber} placeholder="Phone Number"/>
            {#if formErrors.phoneNumber}<span class="error">{formErrors.phoneNumber}</span>{/if}

            <Select bind:value={form.timeFrame}>
                <option value="">Select Time Frame</option>
                <option value="I want to sell my home now">I want to sell my home now</option>
                <option value="In the next 3 months">In the next 3 months</option>
                <option value="In the next 12 months">In the next 12 months</option>
                <option value="I'm just curious about my home's value">I'm just curious about my home's value</option>
            </Select>
            {#if formErrors.timeFrame}<span class="error">{formErrors.timeFrame}</span>{/if}

            <Button type="submit" disabled={isLoading}>
                {#if isLoading}Loading...{:else}Submit{/if}
            </Button>

            {#if errorMessage}
                <p class="error">{errorMessage}</p>
            {/if}
        </form>
    {/if}
</Card>

<style>
    .error {
        color: red;
    }
    .success {
        color: green;
    }
</style>
