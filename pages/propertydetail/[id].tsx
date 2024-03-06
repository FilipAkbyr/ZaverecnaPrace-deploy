import { Button, TextField, Container, Typography, Grid } from "@mui/material";
import { useState, useEffect, ChangeEvent, use } from "react";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";
import Navbar from "../../components/navbar";
import { House, useHouseQueryLazyQuery, useUserDataQuery } from "../../generated/graphql";
import router, { useRouter } from "next/router";
import { authUtils } from "../../firebase/auth-utils";


const PropertyDetail = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const user = authUtils.getCurrentUser();
  const userData = useUserDataQuery({variables: {email: user?.email ?? ""}}).data?.user;

  const {id} = router.query;

  const [getHouse, { loading, error, data }] = useHouseQueryLazyQuery({
    variables: { propertyId: id?.toString() ?? "" },
  });

  useEffect(() => {
    if (router.isReady) {
      getHouse();
      setPropertyData(data?.property as House);
      setIsAdmin(userData?.role === 'Admin');
    }
  }, [router, getHouse, data, userData]);
  
  const [imageList, setImageList] = useState<string[]>([]);
  const [propertyData, setPropertyData] = useState<House | undefined>();
  
  const imageDir = `images/${id}/`;

  const imageListRef = ref(storage, imageDir);

  const uploadImage = (image: File) => {
    if (image == null) return;
    const imageRef = ref(storage, imageDir + `${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Property Detail
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={propertyData?.description}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={propertyData?.price}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={propertyData?.city}
              disabled={true}
            />
          </Grid>
          {isAdmin && (
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      uploadImage(e.target.files[0]);
                    }
                  }}
                  hidden
                />
              </Button>
            </Grid>
          )}
          {imageList.map((url, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Image
                style={{ borderRadius: "10px" }}
                width={260}
                height={190}
                src={url}
                alt={`property-${index}`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PropertyDetail;
