import { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";

// Function to send SOL transaction
export default async function sendTransaction(senderWallet, receiverAddress, amount) {
    try {
        const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
        const senderPublicKey = new PublicKey(senderWallet);
        const receiverPublicKey = new PublicKey(receiverAddress);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: senderPublicKey,
                toPubkey: receiverPublicKey,
                lamports: amount * 1_000_000_000, // Convert SOL to lamports
            })
        );

        // Send transaction
        const signature = await sendAndConfirmTransaction(connection, transaction, [senderWallet]);
        console.log("Transaction Successful! Signature:", signature);
        return signature;
    } catch (error) {
        console.error("Transaction failed:", error);
        throw error;
    }
}
