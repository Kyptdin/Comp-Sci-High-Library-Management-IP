/* eslint-disable react-refresh/only-export-components */

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { EmailWrapper } from "./EmailWrapper";

/**
 * Email component for notifying students about a missing book.
 */
export const StudentReturnBookEmail = () => (
  <EmailWrapper>
    <Html>
      <Head />
      <Preview>Missing Book</Preview>
      <Body className="bg-white font-sans">
        <Container className="mx-auto p-6 pb-12 bg-no-repeat bg-bottom">
          <Container className="flex justify-center">
            <Img
              className="h-5"
              src={
                "https://vygjxzhtqazwuskkaxpz.supabase.co/storage/v1/object/public/logos/black.png"
              }
              alt="Comp Sci High Library Logo"
            />
          </Container>

          <Section className="my-6">
            <Text className="text-base leading-7 mt-4">
              Dear {"{STUDENT'S NAME}"},
            </Text>
            <Text className="text-base leading-7">
              We are notifying you that you have returned the book "
              <span className="font-bold">{"{BOOK NAME}"}."</span>
            </Text>
            <Text className="text-base leading-7">
              If you have any questions or need further assistance, please don't
              hesitate to contact us.
            </Text>
          </Section>
          <Text className="text-base leading-7 mt-4">
            Best Regards,
            <br />
            CSH Library Team
          </Text>
          <Hr className="border-t border-gray-300 mt-12" />
          <Text className="text-xs text-gray-600 ml-1">
            Urban Assembly Charter School for Computer Science
          </Text>
          <Text className="text-xs text-gray-600 ml-1">
            1300 Boynton Ave, Bronx, NY 10472
          </Text>
        </Container>
      </Body>
    </Html>
  </EmailWrapper>
);

export default StudentReturnBookEmail;
