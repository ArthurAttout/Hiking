package com.hiking;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.horcrux.svg.SvgPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.horcrux.svg.SvgPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.horcrux.svg.SvgPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.horcrux.svg.SvgPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.horcrux.svg.SvgPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.horcrux.svg.SvgPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import org.reactnative.camera.RNCameraPackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new RNUUIDGeneratorPackage(),
            new SvgPackage(),
            new ReactMaterialKitPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new FIRMessagingPackage(),
            new RNCardViewPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new RNUUIDGeneratorPackage(),
            new SvgPackage(),
            new ReactMaterialKitPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new FIRMessagingPackage(),
            new RNCardViewPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new RNUUIDGeneratorPackage(),
            new SvgPackage(),
            new ReactMaterialKitPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new FIRMessagingPackage(),
            new RNCardViewPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new RNUUIDGeneratorPackage(),
            new SvgPackage(),
            new ReactMaterialKitPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new FIRMessagingPackage(),
            new RNCardViewPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new RNUUIDGeneratorPackage(),
            new SvgPackage(),
            new ReactMaterialKitPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new FIRMessagingPackage(),
            new RNCardViewPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new RNUUIDGeneratorPackage(),
            new SvgPackage(),
            new ReactMaterialKitPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new FIRMessagingPackage(),
            new RNCardViewPackage(),
            new RNCameraPackage(),
            new RNCameraPackage(),
            new ImagePickerPackage(),
            new RNUUIDGeneratorPackage(),
            new ReactMaterialKitPackage(),
            new SvgPackage(),
            new VectorIconsPackage(),
            new FIRMessagingPackage(),
            new RNCardViewPackage(),
            new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
