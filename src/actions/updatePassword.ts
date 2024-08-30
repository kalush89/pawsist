'use server'
import { db } from "@/db";
import { saltAndHashPassword } from "@/utils/helper";


export const updatePassword = async ({newPassword}: {newPassword: string}, {tokenFromUrl}: {tokenFromUrl: string}) => {
    try {
      console.log("token from url", tokenFromUrl);
        // Find the verification token in the database
        const verificationToken = await db.verificationToken.findFirst({
          where: {
            token: tokenFromUrl,
            expires: {
              gt: new Date(), // Ensure the token has not expired
            },
          },
        });
    
        if (!verificationToken) {
          return { error: 'Invalid or expired token.' };
        }
    
        // Find the user associated with this token
        const user = await db.user.findUnique({
          where: {
            email: verificationToken.identifier,
          },
        });
    
        if (!user) {
          return { error: 'User not found.' };
        }
    
        // Hash the new password
        const hashedPassword: string = await saltAndHashPassword(newPassword);
        
        // Update the user's password in the database
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            hashedPassword,
          },
        });
    
        // Delete the used token from the database
        await db.verificationToken.delete({
          where: {
            id: verificationToken.id,
          },
        });
    
        return { success: 'Update successful' };
        
      } catch (error) {
        //console.error('Error resetting password:', (error as Error).message);
        return { error: 'Error resetting password. Try again later.' };
      } finally {
        await db.$disconnect();
      }

}
